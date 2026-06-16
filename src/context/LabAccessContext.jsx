import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchEnabledLabIds } from '../lib/api'
import { getEnabledLabs, isLabIdEnabled, labs } from '../data/labs'

const LabAccessContext = createContext(null)

export function LabAccessProvider({ children }) {
  const [enabledLabIds, setEnabledLabIds] = useState([1])
  const [updatedAt, setUpdatedAt] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshLabAccess = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/labs/enabled', { cache: 'no-store' })
      if (response.ok) {
        const data = await response.json()
        setEnabledLabIds(data.enabledLabIds || [1])
        setUpdatedAt(data.updatedAt || null)
      } else {
        const ids = await fetchEnabledLabIds()
        setEnabledLabIds(ids)
      }
    } catch {
      const ids = await fetchEnabledLabIds()
      setEnabledLabIds(ids)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshLabAccess()
  }, [refreshLabAccess])

  const value = useMemo(() => {
    const enabledLabs = getEnabledLabs(enabledLabIds)
    return {
      enabledLabIds,
      enabledLabs,
      allLabs: labs,
      updatedAt,
      loading,
      allLabsReleased: enabledLabs.length === labs.length,
      isLabEnabled: (labId) => isLabIdEnabled(labId, enabledLabIds),
      getLabBySlug: (slug) => enabledLabs.find((lab) => lab.slug === slug),
      refreshLabAccess,
    }
  }, [enabledLabIds, updatedAt, loading, refreshLabAccess])

  return <LabAccessContext.Provider value={value}>{children}</LabAccessContext.Provider>
}

export function useLabAccess() {
  const context = useContext(LabAccessContext)
  if (!context) {
    throw new Error('useLabAccess must be used within LabAccessProvider')
  }
  return context
}
