import React from 'react'

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#242124] to-[#000000] text-white p-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

        <div className="space-y-6">

          <div>
            <h2 className="text-xl font-semibold text-purple-400">
              Need Help?
            </h2>
            <p className="text-gray-300">
              If you experience issues while using QuickGPT, feel free to reach out.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400">
              Email Support
            </h2>
            <p className="text-gray-300">
              support@quickgpt.com
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400">
              Bug Reports
            </h2>
            <p className="text-gray-300">
              Include browser details, device information, screenshots, and steps
              to reproduce the issue.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400">
              Feature Requests
            </h2>
            <p className="text-gray-300">
              Have an idea? We'd love to hear your suggestions for improving QuickGPT.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Contact