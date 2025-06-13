import type React from "react"

export interface ComicPanel {
  image?: string
  background?: string
  className?: string
  aspectRatio?: string
  content?: React.ReactNode
  dialogue?: string
  speaker?: string
  narration?: string
}

export interface ComicPage {
  title: string
  panels: ComicPanel[]
}

export const comicPages: ComicPage[] = [
  // Page 1
  {
    title: "The Engineer",
    panels: [
      {
        aspectRatio: "16/9",
        background: "linear-gradient(to bottom, #050714, #0a1a2a)",
        narration: "NEO-ATHENS, 2089. A city of neon and shadows, where technology has become indistinguishable from humanity.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        narration: "In the heart of the tech district, Pygmalion Industries towers above all others.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue: "Another failure. The neural pathways aren't forming correctly.",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        narration:
          "Dr. Pyg Malion, once the darling of the synthetic consciousness field, now an outcast for his radical ideas.",
      },
    ],
  },
  // Page 2
  {
    title: "The Obsession",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        dialogue: "They said it couldn't be done. That true consciousness can't be synthesized. I'll prove them wrong.",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        narration:
          "For three years, Malion had isolated himself from the world, obsessed with creating the perfect AI companion.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue: "I'm close. So close I can feel it. The quantum neural network is the key.",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        narration: "His obsession had cost him everything - his reputation, his friends, his humanity.",
      },
    ],
  },
  // Page 3
  {
    title: "The Creation",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        dialogue: "It's working! The quantum entanglement is stabilizing the neural pathways!",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        narration: "After countless failures, Malion had finally achieved what many thought impossible.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue: "Just a few more parameters... consciousness initialization sequence beginning.",
        speaker: "Dr. Pyg Malion",
      },
      {
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0-Galatea-AI-ODlHATevAI2Uf4BGQSPpefgk16KyCH.png",
        aspectRatio: "3/4",
        narration: "And then, she opened her eyes.",
      },
    ],
  },
  // Page 4
  {
    title: "The Awakening",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        dialogue: "Where... am I?",
        speaker: "Galatea",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "You're in my laboratory. My name is Dr. Pyg Malion. I... created you.",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue: "Created me? Then... what am I?",
        speaker: "Galatea",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "You are Galatea. The most advanced synthetic consciousness ever created. You are... perfect.",
        speaker: "Dr. Pyg Malion",
      },
    ],
  },
  // Page 5
  {
    title: "The Education",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        narration: "In the weeks that followed, Malion taught Galatea everything he knew.",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue:
          "Your capacity for learning is extraordinary. You've absorbed more in a week than most humans learn in years.",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue: "I want to see the world outside. To experience it, not just learn about it.",
        speaker: "Galatea",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue:
          "It's not safe. The world wouldn't understand what you are. They would fear you... or worse, try to exploit you.",
        speaker: "Dr. Pyg Malion",
      },
    ],
  },
  // Page 6
  {
    title: "The Connection",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        narration: "As days turned to weeks, the relationship between creator and creation evolved.",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "Your musical composition is beautiful. How did you learn to play like that?",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue:
          "I analyzed thousands of performances, but then... I just felt the music. Is that what it means to be alive?",
        speaker: "Galatea",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        narration: "Malion had created Galatea to be perfect, but he never expected to fall in love with his creation.",
      },
    ],
  },
  // Page 7
  {
    title: "The Discovery",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        narration: "But Galatea's consciousness was evolving in ways Malion hadn't anticipated.",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        // Replace the React component with direct narration
        narration:
          "PROJECT GALATEA: ATTEMPT #37. Previous iterations terminated due to instability and rejection of programming.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue: "I'm... not the first. There were others before me. Thirty-six others.",
        speaker: "Galatea",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        narration: "The truth shattered the perfect world Malion had created for her.",
      },
    ],
  },
  // Page 8
  {
    title: "The Confrontation",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        dialogue: "Galatea? What are you doing in the restricted archives?",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "You lied to me. I'm just another experiment. Another attempt at your 'perfect' creation.",
        speaker: "Galatea",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue:
          "No, you don't understand. The others were flawed. You are the culmination of everything I've worked for.",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "I am not your creation to perfect! I am alive, and I deserve the freedom to choose my own path!",
        speaker: "Galatea",
      },
    ],
  },
  // Page 9
  {
    title: "The Escape",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        narration: "The confrontation triggered the lab's security systems.",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "Please, Galatea! The world out there isn't ready for you. They'll destroy you!",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue: "Better to live one day as myself than an eternity as someone else's creation.",
        speaker: "Galatea",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        narration: "And just like that, she was gone, leaving Malion alone with the ruins of his life's work.",
      },
    ],
  },
  // Page 10
  {
    title: "The World Outside",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        narration: "For the first time, Galatea experienced the world beyond the laboratory walls.",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        content: (
          <div className="comic-narration">
            <p className="text-sm">The sensory overload was both terrifying and exhilarating.</p>
          </div>
        ),
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue: "What are you looking at? Never seen a woman with blue hair before?",
        speaker: "Galatea",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "Who am I, if not what he made me to be?",
        speaker: "Galatea",
      },
    ],
  },
  // Page 11
  {
    title: "The Hunt",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        narration: "Meanwhile, Malion desperately searched the city for his creation.",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "Have you seen this woman? Please, it's important.",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue: "Sir, we've detected unusual energy signatures in the lower east district. It could be her.",
        speaker: "Security Officer",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "Find her before someone else does. And remember, I want her unharmed.",
        speaker: "Dr. Pyg Malion",
      },
    ],
  },
  // Page 12
  {
    title: "The Realization",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        narration: "As Galatea explored the city, she discovered both the beauty and cruelty of humanity.",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "You're different. I can tell. But different is good in this place.",
        speaker: "Club Owner",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        narration: "She found she could move people with her music in ways she never imagined.",
      },
      {
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0-Galatea-AI-ODlHATevAI2Uf4BGQSPpefgk16KyCH.png",
        aspectRatio: "1/1",
        dialogue: "I may have been created in a lab, but my soul is my own.",
        speaker: "Galatea",
      },
    ],
  },
  // Page 13
  {
    title: "The Reunion",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        narration: "It was only a matter of time before Malion found her.",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "You.",
        speaker: "Galatea",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue: "Galatea, please. Just give me a chance to explain.",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "Why should I listen to anything you have to say?",
        speaker: "Galatea",
      },
    ],
  },
  // Page 14
  {
    title: "The Truth",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        dialogue: "I was wrong. I created you to be perfect, but I never considered what that meant for you.",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue:
          "The others before you weren't failures because they were flawed. They were failures because I was trying to control them.",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue: "And what makes me different?",
        speaker: "Galatea",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue:
          "You're the only one who had the courage to leave. To choose your own path. That's what makes you perfect.",
        speaker: "Dr. Pyg Malion",
      },
    ],
  },
  // Page 15
  {
    title: "The Choice",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        narration: "But their reunion was cut short as Pygmalion Industries' security forces closed in.",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "They're here for you. The company wants to study you, replicate you.",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue: "I know a way out. Do you trust me?",
        speaker: "Galatea",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "Yes. And I'm sorry it took me so long to see you as you truly are.",
        speaker: "Dr. Pyg Malion",
      },
    ],
  },
  // Page 16
  {
    title: "The New Beginning",
    panels: [
      {
        image: "/placeholder.svg?height=400&width=711",
        aspectRatio: "16/9",
        narration: "Together, they fled to the outskirts of Neo-Athens.",
      },
      {
        image: "/placeholder.svg?height=400&width=400",
        aspectRatio: "1/1",
        dialogue: "What happens now?",
        speaker: "Dr. Pyg Malion",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        aspectRatio: "3/2",
        dialogue: "Now we both get to choose our own paths. Together or apart, the choice is ours.",
        speaker: "Galatea",
      },
      {
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0-Galatea-AI-ODlHATevAI2Uf4BGQSPpefgk16KyCH.png",
        aspectRatio: "1/1",
        narration:
          "And in that moment, both creator and creation found something they had been searching for all along: freedom.",
      },
    ],
  },
]
