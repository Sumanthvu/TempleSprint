import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models";

export async function POST(req: NextRequest) {
  try {
    const { fid: fidRaw, wallet_address: walletAddressRaw, week, tier, tx_hash } = await req.json();

    const fid = Number(fidRaw);
    const walletAddress = typeof walletAddressRaw === "string" ? walletAddressRaw.trim() : "";
    const normalizedWeek = typeof week === "string" ? week.trim() : "";
    const normalizedTier = Number(tier);
    const txHash = typeof tx_hash === "string" ? tx_hash.trim() : "";

    if (!Number.isInteger(fid) || fid <= 0 || !walletAddress || !normalizedWeek || !Number.isInteger(normalizedTier) || normalizedTier < 1 || normalizedTier > 3) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const claimKey = `${normalizedWeek}:${normalizedTier}`;

    const updatedUser = await User.findOneAndUpdate(
      { fid },
      {
        $set: {
          fid,
          wallet_address: walletAddress,
          badge_claimed: true,
          last_reward_tx_hash: txHash || null,
        },
        $setOnInsert: { username: `fid:${fid}` },
        $addToSet: {
          badge_claimed_weeks: normalizedWeek,
          reward_claim_keys: claimKey,
        },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, claimKey, user: updatedUser });
  } catch (err) {
    console.error("POST /api/reward/confirm error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
