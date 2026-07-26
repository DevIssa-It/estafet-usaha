"use client";

import { useState } from "react";
import { Business } from "@/types";
import { SwitcherTriggerButton } from "./switcher/SwitcherTriggerButton";
import { SwitcherDropdownList } from "./switcher/SwitcherDropdownList";
import { JoinClientModal } from "./switcher/JoinClientModal";

interface ClientBusinessSwitcherProps {
  currentBusiness: Business;
  clientBusinesses?: Business[];
  isNotary?: boolean;
}

export function ClientBusinessSwitcher({ currentBusiness, clientBusinesses = [], isNotary = false }: ClientBusinessSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Strictly use real database businesses list; if empty fallback to current single business
  const businessesList = clientBusinesses.length > 0 ? clientBusinesses : [currentBusiness];

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
          onOpenModal={() => setIsModalOpen(true)}
        />
      )}

      <JoinClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
