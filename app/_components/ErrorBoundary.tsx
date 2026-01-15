"use client"

import React from "react"
import { Button } from "@/components/ui/button"

type Props = {
  children: React.ReactNode
  title?: string
}

type State = {
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  private reset = () => {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return (
        <div className="bg-white border border-red-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-red-700">
            {this.props.title || "Une erreur est survenue"}
          </h2>
          <p className="text-sm text-gray-700 mt-2">
            {this.state.error.message || "Impossible d’afficher cette section."}
          </p>
          <div className="mt-4">
            <Button onClick={this.reset} className="bg-slate-900 hover:bg-slate-800">
              Réessayer
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

