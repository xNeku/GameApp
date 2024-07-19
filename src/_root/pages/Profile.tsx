import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useUserContext } from '@/context/AuthContext'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const Profile = () => {
  const { user } = useUserContext();
  const [selectedTab, setSelectedTab] = useState("menu1");

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="w-full relative">
        <img 
          src="/assets/images/banner.jpg"
          alt="Banner"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
          <img 
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div className="ml-4 text-white">
            <h2 className="text-2xl font-bold">{user.id}</h2>
            <p className="text-lg">Lvl Account</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mt-8">
        <Tabs defaultValue="menu1" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="flex space-x-4">
            <TabsTrigger value="menu1" className="py-2 px-4">Menu 1</TabsTrigger>
            <TabsTrigger value="menu2" className="py-2 px-4">Menu 2</TabsTrigger>
            <TabsTrigger value="menu3" className="py-2 px-4">Menu 3</TabsTrigger>
          </TabsList>

          <TabsContent value="menu1" className="mt-8">
            <div className="grid grid-cols-1 gap-8">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold mb-4">Steam</h3>
                <Carousel>
                  <CarouselContent>
                    <CarouselItem>
                      <div className="p-10 text-center bg-light-200 rounded-lg">Steam Item 1</div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-10 text-center bg-light-200 rounded-lg">Steam Item 2</div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-10 text-center bg-light-200 rounded-lg">Steam Item 3</div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious>Prev</CarouselPrevious>
                  <CarouselNext>Next</CarouselNext>
                </Carousel>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold mb-4">Xbox</h3>
                <Carousel>
                  <CarouselContent>
                    <CarouselItem>
                      <div className="p-10 text-center bg-light-200 rounded-lg">Xbox Item 1</div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-10 text-center bg-light-200 rounded-lg">Xbox Item 2</div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-10 text-center bg-light-200 rounded-lg">Xbox Item 3</div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious>Prev</CarouselPrevious>
                  <CarouselNext>Next</CarouselNext>
                </Carousel>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold mb-4">PSN</h3>
                <Carousel>
                  <CarouselContent>
                    <CarouselItem>
                      <div className="p-10 text-center bg-light-200 rounded-lg">PSN Item 1</div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-10 text-center bg-light-200 rounded-lg">PSN Item 2</div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-10 text-center bg-light-200 rounded-lg">PSN Item 3</div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious>Prev</CarouselPrevious>
                  <CarouselNext>Next</CarouselNext>
                </Carousel>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="menu2" className="mt-8">
            <div className="w-full flex justify-center">
              <div className="w-1/2 text-center">
              Progress Bar
                <Progress value={40} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="menu3" className="mt-8">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4">Menu 3 Content</h3>
              <p>Anything you want here...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
