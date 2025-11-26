"use client"

import { useState, useEffect } from "react"
import { RestaurantForm } from "@/components/restaurant-form"
import { RestaurantList } from "@/components/restaurant-list"
import { useToast } from "@/hooks/use-toast"
import { restaurantApi } from "@/api/endpoint"

export type Restaurant = {
  id: number
  name: string
  price: number
  category: string
  description: string
  link: string
  image: string
}

export default function RestaurantManagementPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const fetchRestaurants = async () => {
    setIsLoading(true)
    try {
      const data = await restaurantApi.getRestaurants()
      setRestaurants(data)
    } catch (error) {
      console.error("Fetch error:", error)
      toast({
        title: "불러오기 실패",
        description: error instanceof Error ? error.message : "맛집 목록을 불러올 수 없습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const handleAddRestaurant = async (restaurant: Omit<Restaurant, "id">) => {
    try {
      const newRestaurant = await restaurantApi.addRestaurant(restaurant)

      // Add to local state immediately (Mock API doesn't persist data)
      setRestaurants((prev) => [...prev, newRestaurant])

      toast({
        title: "✨ 등록 완료",
        description: "맛집이 성공적으로 등록되었습니다.",
      })
    } catch (error) {
      console.error("Add restaurant error:", error)
      toast({
        title: "등록 실패",
        description: error instanceof Error ? error.message : "맛집 등록에 실패했습니다.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteRestaurant = async (id: number) => {
    try {
      await restaurantApi.deleteRestaurant(id)

      // Remove from local state immediately
      setRestaurants((prev) => prev.filter((r) => r.id !== id))

      toast({
        title: "🗑️ 삭제 완료",
        description: "맛집이 삭제되었습니다.",
      })
    } catch (error) {
      console.error("Delete restaurant error:", error)
      toast({
        title: "삭제 실패",
        description: error instanceof Error ? error.message : "맛집 삭제에 실패했습니다.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                🍽️ 맛집 관리
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                나만의 맛집 리스트를 만들고 관리하세요
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 font-medium">
                총 {restaurants.length}개
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <RestaurantForm onSubmit={handleAddRestaurant} />
            </div>
          </div>
          <div className="lg:col-span-3">
            <RestaurantList restaurants={restaurants} onDelete={handleDeleteRestaurant} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  )
}
