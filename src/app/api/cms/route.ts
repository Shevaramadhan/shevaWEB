import { headers } from "next/headers";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import {
  INITIAL_CMS_DATA,
  type PortfolioCMSData,
} from "@/lib/portfolio-store";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "portfolio-cms.json");

function getAdminExpectedToken(): string {
  return process.env.ADMIN_PASSWORD || "sheva2026";
}

async function readLocalDataFile(): Promise<PortfolioCMSData> {
  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<PortfolioCMSData>;
    return {
      projects: Array.isArray(parsed.projects)
        ? parsed.projects
        : INITIAL_CMS_DATA.projects,
      achievements: Array.isArray(parsed.achievements)
        ? parsed.achievements
        : INITIAL_CMS_DATA.achievements,
      gallery: Array.isArray(parsed.gallery)
        ? parsed.gallery
        : INITIAL_CMS_DATA.gallery,
      updatedAt: parsed.updatedAt || INITIAL_CMS_DATA.updatedAt,
    };
  } catch {
    return INITIAL_CMS_DATA;
  }
}

export async function GET() {
  // Access runtime request headers so Next.js 16 cacheComponents treats this route as dynamic
  await headers();

  const data = await readLocalDataFile();
  return NextResponse.json({
    ok: true,
    source: process.env.SUPABASE_URL ? "supabase" : "json-store",
    data,
  });
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (token !== getAdminExpectedToken()) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized: Invalid admin token." },
      { status: 401 }
    );
  }

  try {
    const body = (await request.json()) as Partial<PortfolioCMSData>;
    const current = await readLocalDataFile();

    const nextData: PortfolioCMSData = {
      projects: Array.isArray(body.projects) ? body.projects : current.projects,
      achievements: Array.isArray(body.achievements)
        ? body.achievements
        : current.achievements,
      gallery: Array.isArray(body.gallery) ? body.gallery : current.gallery,
      updatedAt: new Date().toISOString(),
    };

    let persistedToDisk = false;
    try {
      await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
      await fs.writeFile(
        DATA_FILE_PATH,
        JSON.stringify(nextData, null, 2),
        "utf-8"
      );
      persistedToDisk = true;
    } catch {
      // On read-only serverless filesystems (e.g. Vercel without external DB),
      // client-side sync + JSON export handles persistence gracefully.
      persistedToDisk = false;
    }

    return NextResponse.json({
      ok: true,
      persistedToDisk,
      data: nextData,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Invalid request payload",
      },
      { status: 400 }
    );
  }
}

