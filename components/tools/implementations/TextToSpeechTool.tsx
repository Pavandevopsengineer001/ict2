"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Square } from "lucide-react"

export default function TextToSpeechTool() {
  const [text, setText] = useState("")
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState("")
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices()
      setVoices(availableVoices)
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name)
      }
    }

    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      speechSynthesis.cancel()
    }
  }, [selectedVoice])

  const speak = () => {
    if (isPaused) {
      speechSynthesis.resume()
      setIsPaused(false)
      return
    }

    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const voice = voices.find((v) => v.name === selectedVoice)
    if (voice) utterance.voice = voice
    utterance.rate = rate
    utterance.pitch = pitch

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }

    speechSynthesis.speak(utterance)
  }

  const pause = () => {
    speechSynthesis.pause()
    setIsPaused(true)
  }

  const stop = () => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Text to Speak</label>
              <Textarea
                placeholder="Enter text to convert to speech"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Voice</label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Speed: {rate}x</label>
                <Slider
                  value={[rate]}
                  onValueChange={([v]) => setRate(v)}
                  min={0.5}
                  max={2}
                  step={0.1}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Pitch: {pitch}</label>
                <Slider
                  value={[pitch]}
                  onValueChange={([v]) => setPitch(v)}
                  min={0.5}
                  max={2}
                  step={0.1}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={speak} disabled={!text}>
                <Play className="h-4 w-4 mr-2" />
                {isPaused ? "Resume" : "Speak"}
              </Button>
              {isSpeaking && !isPaused && (
                <Button variant="outline" onClick={pause}>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              )}
              {(isSpeaking || isPaused) && (
                <Button variant="outline" onClick={stop}>
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
