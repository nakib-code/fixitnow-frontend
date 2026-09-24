"use client";

import ProfileForm from "./_components/ProfileForm";

import { useMyTechnicianProfile } from "@/hooks/technicians/use-my-technician-profile";

export default function TechnicianProfilePage() {
  const {
    data: profile,
    isLoading,
  } = useMyTechnicianProfile();

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-20 text-center">
        Technician profile not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <ProfileForm
        profile={profile}
      />

    </div>
  );
}