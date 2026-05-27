import 'dotenv/config'
import ai from './configs/gemini.js'

async function test() {

    try {

        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: "hello"
        })

        console.log(result.text)

    } catch (error) {

        console.log(error)
    }
}

test()