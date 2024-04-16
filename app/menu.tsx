import GameLogo from '@/components/GameLogo'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router'
import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function HomePage() {
  return (
    <LinearGradient
      colors={['#020711', '#142e65', '#020711']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <GameLogo />
        <Link href={'/levelList'} style={styles.link}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Play Game</Text>
          </View>
        </Link>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  link: {
    marginBottom: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fb9b00',
    borderRadius: 100,
  },
  buttonText: {
    marginTop: 5,
    fontFamily: 'Teko500',
    fontSize: 48,
    color: '#fff',
  },
})
