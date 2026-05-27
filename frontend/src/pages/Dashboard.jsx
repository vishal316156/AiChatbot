import React, { useEffect, useState } from "react"

const Dashboard = () => {
    const [data, setData] = useState({
        totalChats: 0,
        totalMessages: 0,
        totalImages: 0,
        credits: 0
    })
    const [loading, setLoading] = useState(true)

    const fetchDashboard = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/dashboard`,
                {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                }
            )
            const result = await response.json()
            if (result.success) {
                setData(result.dashboardData)
            }
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p>Loading Dashboard...</p>
            </div>
        )
    }

    return (
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Dashboard Overview
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Track your AI usage and activity
                </p>
            </div>
            <div className="grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-6">

                <div className="bg-primary/10 dark:bg-[#583c79]/20
                border border-primary/20 dark:border-[#80609F]/20
                rounded-2xl p-6">

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Chats
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        {data.totalChats}
                    </h2>
                </div>

                <div className="bg-primary/10 dark:bg-[#583c79]/20
                border border-primary/20 dark:border-[#80609F]/20
                rounded-2xl p-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Messages Sent
                    </p>
                    <h2 className="text-4xl font-bold mt-3">
                        {data.totalMessages}
                    </h2>
                </div>

                <div className="bg-primary/10 dark:bg-[#583c79]/20
                border border-primary/40 dark:border-[#80609F]/20
                rounded-2xl p-6
                shadow-[0_2px_12px_rgba(124,58,237,0.12)]">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Images Generated
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        {data.totalImages}
                    </h2>
                </div>

                <div className="bg-primary/10 dark:bg-[#583c79]/20
                border border-primary/40 dark:border-[#80609F]/20
                rounded-2xl p-6
                shadow-[0_2px_12px_rgba(124,58,237,0.12)]">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Credits Left
                    </p>

                    <h2 className="text-4xl font-bold mt-3">
                        {data.credits}
                    </h2>

                </div>
            </div>
        </div>
    )
}

export default Dashboard