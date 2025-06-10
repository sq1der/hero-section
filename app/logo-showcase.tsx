"use client"

import { useState } from "react"
import MolDigitalLogo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LogoShowcase() {
  const [variant, setVariant] = useState<"default" | "light" | "dark" | "monochrome">("default")
  const [animated, setAnimated] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Новый логотип Mol Digital</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Современный, минималистичный и запоминающийся логотип, отражающий инновационный характер компании
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mb-16">
          <div className="bg-gray-800/50 p-16 rounded-2xl mb-8 flex items-center justify-center">
            <MolDigitalLogo size="xl" variant={variant} animated={animated} />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant={variant === "default" ? "default" : "outline"}
              onClick={() => setVariant("default")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Основной
            </Button>
            <Button
              variant={variant === "light" ? "default" : "outline"}
              onClick={() => setVariant("light")}
              className={variant === "light" ? "bg-gray-100 text-gray-900" : ""}
            >
              Светлый
            </Button>
            <Button
              variant={variant === "dark" ? "default" : "outline"}
              onClick={() => setVariant("dark")}
              className={variant === "dark" ? "bg-gray-900 text-white" : ""}
            >
              Темный
            </Button>
            <Button variant={variant === "monochrome" ? "default" : "outline"} onClick={() => setVariant("monochrome")}>
              Монохромный
            </Button>
            <Button
              variant="outline"
              onClick={() => setAnimated(!animated)}
              className={animated ? "border-green-500 text-green-500" : ""}
            >
              {animated ? "Анимация вкл" : "Анимация выкл"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="concept" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="concept">Концепция</TabsTrigger>
            <TabsTrigger value="usage">Применение</TabsTrigger>
            <TabsTrigger value="variations">Варианты</TabsTrigger>
          </TabsList>
          <TabsContent value="concept">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Концепция логотипа</CardTitle>
                <CardDescription>Философия и символика нового логотипа</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Новый логотип Mol Digital сочетает в себе минимализм и динамику, отражая основные ценности компании:
                  инновации, скорость и масштабируемость.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Символика круга</h3>
                    <p className="text-gray-400">
                      Круг символизирует целостность и полный цикл разработки, который предлагает компания своим
                      клиентам.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Стилизованная буква M</h3>
                    <p className="text-gray-400">
                      Динамичная буква M в виде волны отражает гибкость и адаптивность решений компании.
                    </p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Цветовая гамма</h3>
                    <p className="text-gray-400">
                      Синий и фиолетовый цвета символизируют технологичность, надежность и креативность.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="usage">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Применение логотипа</CardTitle>
                <CardDescription>Рекомендации по использованию в различных контекстах</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-bold">Цифровые носители</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                      <li>Веб-сайт (в шапке и футере)</li>
                      <li>Социальные сети (профили и публикации)</li>
                      <li>Email-подписи и рассылки</li>
                      <li>Презентации и документы</li>
                      <li>Мобильные приложения</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold">Печатные материалы</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                      <li>Визитные карточки</li>
                      <li>Фирменные бланки и конверты</li>
                      <li>Рекламные материалы</li>
                      <li>Сувенирная продукция</li>
                      <li>Вывески и баннеры</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="variations">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Варианты логотипа</CardTitle>
                <CardDescription>Адаптация логотипа для различных ситуаций</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-lg flex justify-center">
                    <MolDigitalLogo size="lg" variant="light" animated={false} />
                  </div>
                  <div className="bg-gray-950 p-8 rounded-lg flex justify-center">
                    <MolDigitalLogo size="lg" variant="dark" animated={false} />
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg flex justify-center">
                    <MolDigitalLogo size="lg" variant="default" animated={false} />
                  </div>
                  <div className="bg-gray-200 p-8 rounded-lg flex justify-center">
                    <MolDigitalLogo size="lg" variant="monochrome" animated={false} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
