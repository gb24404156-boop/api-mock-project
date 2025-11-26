"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, ExternalLink, DollarSign } from "lucide-react"
import type { Restaurant } from "@/app/page"
import Image from "next/image"

type RestaurantListProps = {
  restaurants: Restaurant[]
  onDelete: (id: number) => Promise<void>
  isLoading: boolean
}

export function RestaurantList({ restaurants, onDelete, isLoading }: RestaurantListProps) {
  if (isLoading) {
    return (
      <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 bg-white dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">맛집 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 dark:border-slate-700 border-t-orange-500"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium">로딩 중...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 bg-white dark:bg-slate-900">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">맛집 목록</CardTitle>
          <Badge variant="secondary" className="text-sm px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {restaurants.length}개
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {restaurants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-6xl mb-4 opacity-50">🍽️</div>
            <p className="text-center text-slate-500 dark:text-slate-400 font-medium">등록된 맛집이 없습니다</p>
            <p className="text-center text-sm text-slate-400 dark:text-slate-500 mt-2">
              왼쪽 폼에서 맛집을 등록해보세요!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  {/* Image */}
                  <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {restaurant.image ? (
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🍽️
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                          {restaurant.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-950 dark:to-pink-950 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                        >
                          {restaurant.category}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(restaurant.id)}
                        className="flex-shrink-0 h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                        aria-label="맛집 삭제"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                      {restaurant.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-orange-600 dark:text-orange-400">
                        <DollarSign className="h-4 w-4" />
                        <span>{restaurant.price.toLocaleString()}원</span>
                      </div>

                      {restaurant.link && (
                        <a
                          href={restaurant.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors group/link"
                        >
                          <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          <span className="underline-offset-2 group-hover/link:underline">지도에서 보기</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-orange-500/5 group-hover:via-pink-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
