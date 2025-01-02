import { Link } from 'expo-router'
import { SafeAreaView, Text } from 'react-native'

export default function Game() {

  return (
    <SafeAreaView
      className="flex justify-center items-center  h-screen bg-sky-200"
    >
      <Text className="text-4xl font-bold text-sky-900">Game Screen</Text>

      <Link href="/" className="mt-4">
        Go Back
      </Link>
    </SafeAreaView>
  )

}
