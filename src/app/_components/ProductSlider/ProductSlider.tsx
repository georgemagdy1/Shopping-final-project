"use client"
import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  
} from "@/components/ui/carousel"

export function ProductSlider(pro:{images:string[]}) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  
  const images = pro.images

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-2">
              <Card>
                <CardContent className="relative ">
                  <div className="relative h-80 md:h-80 overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover w-full h-full"
                      sizes="100vw 100vh"
                      priority={index === 0}
                      onError={(e) => {
                        console.log(`Failed to load image: ${image}`)
                       
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
    </Carousel>
  )
}