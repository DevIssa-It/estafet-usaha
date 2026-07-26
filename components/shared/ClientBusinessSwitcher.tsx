"use client";

import { useState } from "react";
import { Business } from "@/types";
import { SwitcherTriggerButton } from "./switcher/SwitcherTriggerButton";
import { SwitcherDropdownList } from "./switcher/SwitcherDropdownList";

interface ClientBusinessSwitcherProps {
  currentBusiness: Business;
  clientBusinesses?: Business[];
  isNotary?: boolean;
}

export function ClientBusinessSwitcher({ currentBusiness, clientBusinesses = [], isNotary = false }: ClientBusinessSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const businessesList = clientBusinesses.length > 0 ? clientBusinesses : [
    currentBusiness,
    { id: "demo-client-2", name: "Resto Rasa Nusantara", industry: "Kuliner / F&B", invite_code: "NUSA12", description: "", founded_year: 2012, owner_id: "demo", created_at: "" },
    { id: "demo-client-3", name: "Fashion Hijab House", industry: "Perdagangan / Retail", invite_code: "HIJAB99", description: "", founded_year: 2018, owner_id: "demo", created_at: "" },
  ];

  return (
    <div style={{ position: "relative" }}>
      <SwitcherTriggerButton
        businessName={currentBusiness.name}
        isNotary={isNotary}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <SwitcherDropdownList
          businessesList={businessesList}
          currentBusinessId={currentBusiness.id}
          isNotary={isNotary}
          onSelect={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
