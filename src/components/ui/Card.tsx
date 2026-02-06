import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border border-white/[0.1] bg-[#0A0A0A]/40 text-card-foreground shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:border-[#F24E1E]/40 hover:bg-[#F24E1E]/[0.02] group/card",
            className
        )}
        {...props}
    >
        {/* Industrial Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-100 pointer-events-none" />
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-b from-white/[0.1] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* HUD Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20 rounded-tl-sm group-hover/card:border-[#F24E1E] transition-colors" />
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20 rounded-tr-sm group-hover/card:border-[#F24E1E] transition-colors" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20 rounded-bl-sm group-hover/card:border-[#F24E1E] transition-colors" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20 rounded-br-sm group-hover/card:border-[#F24E1E] transition-colors" />

        <div className="relative z-10">{props.children}</div>
    </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
