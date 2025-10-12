"use client"
import React, { createContext, useContext, useState } from "react"

type ProgressCtx = {
  progress: number // 0..100 (смешанный)
  assetProgress: number // 0..100 по ассетам
  taskProgress: number // 0..100 по tasks
  // tasks API
  startTasks: (total: number) => void
  completeTask: () => void
  // ассеты
  setAssetProgress: (pct: number) => void
  reset: () => void
}

const ProgressContext = createContext<ProgressCtx | undefined>(undefined)

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assetProgress, setAssetProgress] = useState(0)
  const [tasksTotal, setTasksTotal] = useState(0)
  const [tasksDone, setTasksDone] = useState(0)

  const startTasks = (total: number) => {
    setTasksTotal(total)
    setTasksDone(0)
  }
  const completeTask = () => setTasksDone(d => Math.min(tasksTotal, d + 1))

  const taskProgress = tasksTotal > 0 ? Math.round((tasksDone / tasksTotal) * 100) : 0

  // комбинируем: если есть задачи — берём среднее asset/task, иначе только asset
  const progress = tasksTotal > 0
    ? Math.round((assetProgress + taskProgress) / 2)
    : assetProgress

  const reset = () => {
    setAssetProgress(0)
    setTasksTotal(0)
    setTasksDone(0)
  }

  return (
    <ProgressContext.Provider value={{
      progress, assetProgress, taskProgress, startTasks, completeTask, setAssetProgress, reset
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = () => {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider")
  return ctx
}
