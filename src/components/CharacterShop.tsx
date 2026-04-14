"use client";

import { useState } from "react";

interface Character {
  id: string;
  name: string;
  emoji: string;
  tier: "common" | "rare" | "legendary";
  speed: number;
  agility: number;
  luck: number;
  price: number | null; // null = owned
  currency: "SPRINT" | "ETH";
  owned: boolean;
  equipped: boolean;
  isNew?: boolean;
}

const CHARACTERS: Character[] = [
  {
    id: "temple-runner",
    name: "Temple Runner",
    emoji: "🏃",
    tier: "common",
    speed: 60,
    agility: 70,
    luck: 40,
    price: null,
    currency: "SPRINT",
    owned: true,
    equipped: true,
  },
  {
    id: "jungle-explorer",
    name: "Jungle Explorer",
    emoji: "🧭",
    tier: "common",
    speed: 65,
    agility: 60,
    luck: 55,
    price: 250,
    currency: "SPRINT",
    owned: false,
    equipped: false,
  },
  {
    id: "shadow-monk",
    name: "Shadow Monk",
    emoji: "🥷",
    tier: "rare",
    speed: 80,
    agility: 90,
    luck: 45,
    price: 1200,
    currency: "SPRINT",
    owned: false,
    equipped: false,
    isNew: true,
  },
  {
    id: "golden-idol",
    name: "Golden Idol",
    emoji: "🏺",
    tier: "rare",
    speed: 75,
    agility: 65,
    luck: 85,
    price: 800,
    currency: "SPRINT",
    owned: false,
    equipped: false,
  },
  {
    id: "ancient-guardian",
    name: "Ancient Guardian",
    emoji: "🗿",
    tier: "legendary",
    speed: 95,
    agility: 85,
    luck: 95,
    price: 0.05,
    currency: "ETH",
    owned: false,
    equipped: false,
  },
  {
    id: "phoenix-spirit",
    name: "Phoenix Spirit",
    emoji: "🔥",
    tier: "legendary",
    speed: 100,
    agility: 95,
    luck: 80,
    price: 0.08,
    currency: "ETH",
    owned: false,
    equipped: false,
    isNew: true,
  },
];

type FilterType = "all" | "owned" | "rare" | "new";

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-0.5">
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9,
            color: "rgba(196,168,130,0.7)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontWeight: 600,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 10,
            color: "#C4A882",
            fontWeight: 700,
          }}
        >
          {value}
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: "#ffffff",
            borderRadius: 2,
            transition: "width 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </div>
    </div>
  );
}

function TierBadge({ tier }: { tier: Character["tier"] }) {
  const config = {
    common: { label: "COMMON", color: "rgba(255,255,255,0.4)", bg: "rgba(255,255,255,0.05)" },
    rare: { label: "RARE", color: "rgba(255,255,255,0.7)", bg: "rgba(255,255,255,0.1)" },
    legendary: { label: "ELITE", color: "#ffffff", bg: "rgba(255,255,255,0.2)" },
  }[tier];

  return (
    <span
      style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 9,
        fontWeight: 700,
        color: config.color,
        background: config.bg,
        border: `1px solid ${config.color}50`,
        borderRadius: 4,
        padding: "2px 6px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {config.label}
    </span>
  );
}

function CharacterCard({
  character,
  onEquip,
  onBuy,
}: {
  character: Character;
  onEquip: (id: string) => void;
  onBuy: (id: string) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const isLocked = !character.owned;
  const isLegendary = character.tier === "legendary";

  const borderStyle = isLegendary
    ? {
        animation: "rainbowShimmer 3s linear infinite",
        borderWidth: 2,
        borderStyle: "solid",
      }
    : {
        border: `1px solid ${
          character.tier === "rare" ? "rgba(217,119,6,0.4)" : "rgba(196,168,130,0.2)"
        }`,
      };

  return (
    <div
      className="float-anim relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "rgba(0,0,0,0.9)",
        border: `1px solid rgba(255,255,255,${character.tier === "legendary" ? "0.2" : "0.05"})`,
        animationDelay: `${Math.random() * 2}s`,
        perspective: 600,
        minHeight: 280,
      }}
      onClick={() => setFlipped((f) => !f)}
    >
      {/* New badge */}
      {character.isNew && (
        <div
          className="absolute top-2 right-2 z-20"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 7,
            fontWeight: 800,
            color: "#ffffff",
            background: "rgba(255,255,255,0.15)",
            borderRadius: 4,
            padding: "2px 6px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          NEW
        </div>
      )}

      {/* Card face (front) */}
      <div
        style={{
          display: flipped ? "none" : "flex",
          flexDirection: "column",
          padding: "20px 16px 16px",
          height: "100%",
          gap: 12,
          animation: flipped ? undefined : "cardFlipIn 0.35s ease-out",
        }}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center mb-1">
          <div
            style={{
              fontSize: 52,
              lineHeight: 1,
              marginBottom: 10,
              filter: isLocked
                ? "grayscale(0.7) brightness(0.6)"
                : "drop-shadow(0 0 12px rgba(217,119,6,0.6))",
            }}
          >
            {character.emoji}
          </div>
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#FEF3C7",
              letterSpacing: "0.05em",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            {character.name}
          </div>
          <TierBadge tier={character.tier} />
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-2">
          <StatBar label="Speed" value={character.speed} color="#D97706" />
          <StatBar label="Agility" value={character.agility} color="#C2410C" />
          <StatBar label="Luck" value={character.luck} color="#166534" />
        </div>

        {/* Action button */}
        <div className="mt-auto">
          {character.equipped ? (
            <div
              className="glow-green"
              style={{
                textAlign: "center",
                padding: "8px",
                borderRadius: 10,
                border: "1px solid rgba(22,163,74,0.5)",
                background: "rgba(22,101,52,0.2)",
                fontFamily: "'Cinzel', serif",
                fontSize: 12,
                fontWeight: 700,
                color: "#22C55E",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              ✓ Equipped
            </div>
          ) : character.owned ? (
            <button
              className="glow-green w-full"
              onClick={(e) => {
                e.stopPropagation();
                onEquip(character.id);
              }}
              style={{
                padding: "8px",
                borderRadius: 10,
                border: "1px solid rgba(22,163,74,0.5)",
                background: "rgba(22,101,52,0.2)",
                fontFamily: "'Cinzel', serif",
                fontSize: 12,
                fontWeight: 700,
                color: "#22C55E",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Equip
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBuy(character.id);
              }}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              PRICE: {character.currency === "ETH"
                ? `${character.price} ETH`
                : `${character.price} PTS`}
            </button>
          )}
        </div>
      </div>

      {/* Card back (detail) */}
      {flipped && (
        <div
          style={{
            padding: "20px 16px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            animation: "cardFlipIn 0.35s ease-out",
          }}
        >
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 20,
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            {character.emoji}
          </div>
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 13,
              fontWeight: 700,
              color: "#FEF3C7",
              textAlign: "center",
            }}
          >
            {character.name}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: "#C4A882",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            {character.tier === "legendary"
              ? "A mythical being wielding ancient temple powers. Unstoppable."
              : character.tier === "rare"
              ? "Battle-tested and swift. Chosen by the temple spirits."
              : "A brave soul who dared to enter the sacred halls."}
          </div>

          <div
            style={{
              marginTop: "auto",
              padding: 10,
              borderRadius: 10,
              background: "rgba(217,119,6,0.05)",
              border: "1px solid rgba(217,119,6,0.2)",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#7A6647", marginBottom: 4 }}
            >
              TAP TO FLIP BACK
            </div>
            <TierBadge tier={character.tier} />
          </div>
        </div>
      )}

      {/* Shimmer lock overlay */}
      {isLocked && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(13,10,5,0.55)", zIndex: 10 }}
        >
          <div className="shimmer absolute inset-0" style={{ zIndex: 9 }} />
          <div
            style={{
              fontSize: 28,
              filter: "drop-shadow(0 0 8px rgba(217,119,6,0.5))",
              zIndex: 11,
              position: "relative",
            }}
          >
            🔒
          </div>
        </div>
      )}
    </div>
  );
}

interface CharacterShopProps {
  onClose: () => void;
  sprintBalance?: number;
  ethBalance?: string;
}

export default function CharacterShop({
  onClose,
  sprintBalance = 1250,
  ethBalance = "0.12",
}: CharacterShopProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [characters, setCharacters] = useState(CHARACTERS);

  const filtered = characters.filter((c) => {
    if (filter === "owned") return c.owned;
    if (filter === "rare") return c.tier === "rare" || c.tier === "legendary";
    if (filter === "new") return c.isNew;
    return true;
  });

  const handleEquip = (id: string) => {
    setCharacters((prev) =>
      prev.map((c) => ({ ...c, equipped: c.id === id }))
    );
  };

  const handleBuy = (id: string) => {
    const char = characters.find((c) => c.id === id);
    if (!char) return;
    // Simulate purchase
    if (char.currency === "SPRINT" && char.price && sprintBalance >= char.price) {
      setCharacters((prev) =>
        prev.map((c) => (c.id === id ? { ...c, owned: true } : c))
      );
    }
  };

  const FILTERS: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "owned", label: "Owned" },
    { key: "rare", label: "Rare" },
    { key: "new", label: "New" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(13,10,5,0.85)", backdropFilter: "blur(12px)" }}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden crack-reveal"
        style={{
          background: "linear-gradient(145deg, #1A1208, #0D0A05)",
          border: "1px solid rgba(217,119,6,0.3)",
          boxShadow: "0 0 60px rgba(217,119,6,0.15), 0 40px 80px rgba(0,0,0,0.6)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 24px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            position: "sticky",
            top: 0,
            background: "#000000",
            zIndex: 5,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#FEF3C7",
                  margin: 0,
                  letterSpacing: "0.06em",
                }}
              >
                🏺 Character Vault
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "#7A6647",
                  margin: "2px 0 0",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Choose your temple guardian
              </p>
            </div>

            {/* Balance display */}
            <div className="flex items-center gap-3">
              <div className="hud-panel px-3 py-2 text-center">
                <div style={{ fontSize: 9, color: "rgba(217,119,6,0.7)", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "'Inter', sans-serif" }}>
                  $SPRINT
                </div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 800, color: "#F59E0B" }}>
                  {sprintBalance.toLocaleString()}
                </div>
              </div>
              <div className="hud-panel px-3 py-2 text-center">
                <div style={{ fontSize: 9, color: "rgba(217,119,6,0.7)", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "'Inter', sans-serif" }}>
                  ETH
                </div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 800, color: "#C4A882" }}>
                  {ethBalance}
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "5px 14px",
                  borderRadius: 20,
                  border: filter === f.key
                    ? "1px solid rgba(255,255,255,0.2)"
                    : "1px solid rgba(255,255,255,0.05)",
                  background: filter === f.key
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                  color: filter === f.key ? "#ffffff" : "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Character grid */}
        <div
          style={{
            padding: 20,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            gap: 14,
          }}
        >
          {filtered.map((char, i) => (
            <div
              key={char.id}
              style={{
                animation: `slideInRow 0.4s ease-out ${i * 0.07}s both`,
              }}
            >
              <CharacterCard
                character={char}
                onEquip={handleEquip}
                onBuy={handleBuy}
              />
            </div>
          ))}

          {filtered.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                padding: "40px",
                textAlign: "center",
                fontFamily: "'Cinzel', serif",
                color: "#7A6647",
                fontSize: 13,
              }}
            >
              No characters match this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
