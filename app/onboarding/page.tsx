import { AuthGuard } from '@/components/auth-guard'
import { OnboardingFlow } from '@/components/onboarding-flow'

export default function OnboardingPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <OnboardingFlow />
      </div>
    </AuthGuard>
  )
}