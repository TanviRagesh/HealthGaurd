"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bot, Send, User } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  created_at: string
}

interface ChatInterfaceProps {
  userId: string
  initialMessages: Message[]
  userName: string
}

export function ChatInterface({ userId, initialMessages, userName }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple keyword-based responses for demonstration
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("blood pressure") || lowerMessage.includes("hypertension")) {
      return "Blood pressure is an important indicator of cardiovascular health. Normal blood pressure is typically around 120/80 mmHg. If your readings are consistently elevated (above 130/80), I recommend consulting with your doctor. In the meantime, maintaining a healthy diet low in sodium, regular exercise, stress management, and adequate sleep can help manage blood pressure levels."
    }

    if (lowerMessage.includes("diabetes") || lowerMessage.includes("blood sugar")) {
      return "Blood sugar management is crucial for overall health. Normal fasting blood sugar levels are typically between 70-100 mg/dL. If you're concerned about diabetes risk, maintaining a healthy weight, eating a balanced diet rich in fiber and low in refined sugars, regular physical activity, and monitoring your blood glucose levels are important steps. Always consult with your healthcare provider for personalized advice."
    }

    if (lowerMessage.includes("exercise") || lowerMessage.includes("workout")) {
      return "Regular physical activity is one of the best things you can do for your health. The general recommendation is at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity per week, plus muscle-strengthening activities on 2 or more days. Start slowly if you're new to exercise, and consider activities you enjoy to make it sustainable. Always consult with your doctor before starting a new exercise program, especially if you have existing health conditions."
    }

    if (lowerMessage.includes("diet") || lowerMessage.includes("nutrition") || lowerMessage.includes("food")) {
      return "A balanced diet is fundamental to good health. Focus on whole foods including fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, added sugars, and excessive sodium. Stay well-hydrated by drinking plenty of water. Consider the Mediterranean diet as a heart-healthy eating pattern. Remember, everyone's nutritional needs are different, so consulting with a registered dietitian can provide personalized guidance."
    }

    if (lowerMessage.includes("sleep") || lowerMessage.includes("insomnia")) {
      return "Quality sleep is essential for physical and mental health. Most adults need 7-9 hours of sleep per night. To improve sleep quality: maintain a consistent sleep schedule, create a relaxing bedtime routine, keep your bedroom cool and dark, limit screen time before bed, avoid caffeine late in the day, and manage stress. If you're experiencing persistent sleep problems, consult with your healthcare provider."
    }

    if (lowerMessage.includes("stress") || lowerMessage.includes("anxiety")) {
      return "Managing stress is crucial for overall health and wellbeing. Effective stress management techniques include regular exercise, meditation or mindfulness practices, deep breathing exercises, adequate sleep, maintaining social connections, and engaging in hobbies you enjoy. If stress or anxiety is significantly impacting your daily life, please consider speaking with a mental health professional who can provide personalized support."
    }

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey") ||
      lowerMessage.includes("good morning") ||
      lowerMessage.includes("good afternoon")
    ) {
      return `Hello ${userName}! I'm your AI health assistant. I'm here to provide general health information and guidance. How can I help you today? You can ask me about nutrition, exercise, managing common health conditions, or general wellness topics.`
    }

    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're welcome! I'm here to help. Remember, while I can provide general health information, always consult with your healthcare provider for medical advice specific to your situation. Is there anything else you'd like to know?"
    }

    // Default response
    return "Thank you for your question. While I can provide general health information, I recommend discussing specific concerns with your healthcare provider who can give you personalized medical advice based on your individual health history. Is there a general health topic I can help you with, such as nutrition, exercise, sleep, or stress management?"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput("")
    setLoading(true)

    const supabase = createClient()

    try {
      // Add user message
      const { data: userMsg, error: userError } = await supabase
        .from("chat_messages")
        .insert({
          user_id: userId,
          role: "user",
          content: userMessage,
        })
        .select()
        .single()

      if (userError) throw userError

      setMessages((prev) => [...prev, userMsg])

      // Generate AI response
      const aiResponse = await generateAIResponse(userMessage)

      // Add AI message
      const { data: aiMsg, error: aiError } = await supabase
        .from("chat_messages")
        .insert({
          user_id: userId,
          role: "assistant",
          content: aiResponse,
        })
        .select()
        .single()

      if (aiError) throw aiError

      setMessages((prev) => [...prev, aiMsg])
    } catch (error) {
      console.error("[v0] Chat error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Chat with AI Assistant</CardTitle>
        <CardDescription>
          Ask questions about your health, get advice on wellness topics, and receive personalized recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="h-[500px] overflow-y-auto rounded-lg border border-border bg-muted/30 p-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <p className="mb-2 text-lg font-medium text-foreground">Start a conversation</p>
                <p className="max-w-md text-sm text-muted-foreground">
                  Ask me anything about your health, nutrition, exercise, or general wellness. I'm here to help!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-[80%] rounded-lg bg-background p-3 text-foreground">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-foreground" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about your health..."
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>

          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">
              <strong>Disclaimer:</strong> This AI assistant provides general health information only and is not a
              substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your
              physician or other qualified health provider with any questions you may have regarding a medical
              condition.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
