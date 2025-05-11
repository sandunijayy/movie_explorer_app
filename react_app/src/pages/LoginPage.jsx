import Navbar from "../components/Navbar"
import LoginForm from "../components/LoginForm"

function LoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container flex items-center justify-center px-4 py-12 mx-auto">
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage
