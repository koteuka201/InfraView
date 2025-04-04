import { useEffect } from "react"
import { useStore } from "./store"
import { Dashboard } from "./components"

function App() {
  const {fetchGroups, fetchMetrics}=useStore()

  useEffect(() => {
    fetchGroups()
    fetchMetrics()
    const interval = setInterval(() => {
      fetchGroups()
      fetchMetrics()
    }, 60000)
    return () => clearInterval(interval)
  }, [fetchGroups, fetchMetrics])

  return (
    <>
      <Dashboard />
    </>
  )
}

export default App
