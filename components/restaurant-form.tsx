"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { Restaurant } from "@/app/page"
import { Utensils, DollarSign, Tag, FileText, Link as LinkIcon } from "lucide-react"

type RestaurantFormProps = {
  onSubmit: (restaurant: Omit<Restaurant, "id">) => Promise<void>
}

export function RestaurantForm({ onSubmit }: RestaurantFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    link: "",
    image: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await onSubmit({
      name: formData.name,
      price: Number.parseInt(formData.price),
      category: formData.category,
      description: formData.description,
      link: formData.link,
      image: formData.image,
    })

    // Reset form
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      link: "",
      image: "",
    })
    setIsSubmitting(false)
  }

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 bg-white dark:bg-slate-900">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500">
            <Utensils className="h-5 w-5 text-white" />
          </div>
          맛집 등록
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">
          새로운 맛집 정보를 추가해보세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              맛집 이름
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="예) 명동교자 본점"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-11 border-slate-300 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-orange-500/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              가격 (원)
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="예) 12000"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              className="h-11 border-slate-300 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-orange-500/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              카테고리
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
              <SelectTrigger id="category" className="h-11 border-slate-300 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-orange-500/20">
                <SelectValue placeholder="카테고리를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="한식">🍚 한식</SelectItem>
                <SelectItem value="중식">🥟 중식</SelectItem>
                <SelectItem value="일식">🍱 일식</SelectItem>
                <SelectItem value="양식">🍝 양식</SelectItem>
                <SelectItem value="분식">🍜 분식</SelectItem>
                <SelectItem value="카페">☕ 카페</SelectItem>
                <SelectItem value="기타">🍴 기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              설명
            </Label>
            <Textarea
              id="description"
              placeholder="예) 칼국수 맛집"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="resize-none border-slate-300 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-orange-500/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              링크
            </Label>
            <Input
              id="link"
              type="url"
              placeholder="https://place.map.kakao.com/..."
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              required
              className="h-11 border-slate-300 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-orange-500/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span>🖼️</span>
              이미지 URL
            </Label>
            <Input
              id="image"
              type="url"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
              className="h-11 border-slate-300 dark:border-slate-700 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-orange-500/20 transition-all"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-200 mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "등록 중..." : "✨ 맛집 등록하기"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
