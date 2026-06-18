import React from 'react'

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#242124] to-[#000000] text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

        <div className="space-y-6">

          <div>
            <h2 className="text-xl font-semibold text-purple-400">
              What is QuickGPT?
            </h2>
            <p className="text-gray-300">
              QuickGPT is an AI-powered chatbot that can answer questions,
              generate content, and create AI-generated images.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400">
              How do credits work?
            </h2>
            <p className="text-gray-300">
              Each AI request consumes credits. You can purchase more credits
              from the Credits page.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400">
              Are my chats saved?
            </h2>
            <p className="text-gray-300">
              Yes. Your chats are saved and available whenever you log in.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400">
              Can I delete chats?
            </h2>
            <p className="text-gray-300">
              Yes. Use the delete icon next to any chat in the sidebar.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-purple-400">
              Why am I not getting a response?
            </h2>
            <p className="text-gray-300">
              Check your internet connection, credits balance, and try again.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default FAQ