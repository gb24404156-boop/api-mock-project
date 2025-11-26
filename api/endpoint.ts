import { Restaurant } from "@/app/page"

const API_BASE_URL = "https://24d5f3f4-0575-41b0-bbf8-780027b63eed.mock.pstmn.io"

export const restaurantApi = {
  // 맛집 목록 조회
  async getRestaurants(): Promise<Restaurant[]> {
    const response = await fetch(`${API_BASE_URL}/places`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`GET 요청 실패: ${response.status}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  },

  // 맛집 등록
  async addRestaurant(restaurant: Omit<Restaurant, "id">): Promise<Restaurant> {
    const newRestaurant = {
      ...restaurant,
      id: Date.now(),
    }

    const response = await fetch(`${API_BASE_URL}/places`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRestaurant),
    })

    if (response.status !== 201 && response.status !== 200) {
      throw new Error(`POST 요청 실패: ${response.status}`)
    }

    return newRestaurant
  },

  // 맛집 삭제
  async deleteRestaurant(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/places/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Mock API might return 404, but we consider it success
    if (
      response.status !== 200 &&
      response.status !== 204 &&
      response.status !== 404
    ) {
      throw new Error(`DELETE 요청 실패: ${response.status}`)
    }
  },
}
