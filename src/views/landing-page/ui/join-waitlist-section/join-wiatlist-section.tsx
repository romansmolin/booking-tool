import { Avatar, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

import React from 'react'

export const JoinWaitlistSection = () => {
    return (
        <section className="flex items-center justify-center py-16 ">
            <div className="flex items-center justify-center w-full flex-col px-4">
                <h2 className="py-2 text-center text-5xl font-semibold tracking-tighter md:py-10 lg:text-8xl">
                    Join the Waitlist
                </h2>
                <p className="text-md text-muted-foreground mx-auto max-w-xl text-center lg:text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row w-full max-w-md items-center gap-3 rounded-full p-1">
                    <Input
                        className="bg-muted h-12 w-full border-none shadow-none ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-0 active:ring-0"
                        placeholder="Enter your email"
                    />
                    <Button className="btn-hero  btn-hero--blue text-black w-full sm:w-auto" size={'lg'}>
                        Join the Waitlist
                    </Button>
                </div>
                <div className="mt-10 flex items-center gap-2">
                    <span className="inline-flex items-center -space-x-2.5">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Avatar key={index} className="size-8">
                                <AvatarImage
                                    alt="placeholder"
                                    src={`https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar${index + 1}.png`}
                                />
                            </Avatar>
                        ))}
                    </span>
                    <p className="text-muted-foreground/80 tracking-tight">+100 people already joined</p>
                </div>
            </div>
        </section>
    )
}
