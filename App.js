import { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';

const COLORS = [
  '#ef4444', '#f97316', '#facc15', '#22c55e',
  '#3b82f6', '#a855f7', '#ec4899', '#1f2937',
];

// Світлий фон -> темний текст, темний фон -> світлий текст
function textColorFor(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = n >> 16;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#111111' : '#ffffff';
}

export default function App() {
  const [index, setIndex] = useState(4);
  const color = COLORS[index];
  const ink = textColorFor(color);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <StatusBar barStyle={ink === '#111111' ? 'dark-content' : 'light-content'} />
      <Text style={[styles.hex, { color: ink }]}>{color.toUpperCase()}</Text>
      <Pressable
        style={[styles.button, { borderColor: ink }]}
        onPress={() => setIndex((index + 1) % COLORS.length)}
      >
        <Text style={[styles.buttonText, { color: ink }]}>Змінити колір</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 32 },
  hex: { fontSize: 48, fontWeight: '700', letterSpacing: 1 },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderWidth: 2,
    borderRadius: 14,
  },
  buttonText: { fontSize: 18, fontWeight: '600' },
});
