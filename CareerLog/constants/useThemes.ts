import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export function useTheme() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme as 'light' | 'dark'];
  const isDark = colorScheme === 'dark';

  return {
    theme,
    isDark,
    colorScheme,
    colors: {
      background: isDark ? '#0f172a' : '#f8fafc',
      tint: tintColorLight,
      tabIconDefault: '#ccc',
      tabIconSelected: tintColorLight,
      card: isDark ? '#1e293b' : '#ebe8e8',
      modal: isDark ? '#1e293b' : '#ebe8e8',
      cardAlt: isDark ? '#1e293b' : '#ebe8e8',
      text: isDark ? '#f1f5f9' : '#0f172a',
      subtext: isDark ? '#94a3b8' : '#6b7280',
      border: isDark ? '#334155' : '#d1d5db',
      input: isDark ? '#1e293b' : '#f1f5f9',
      primary: '#2563eb',
      danger: '#E53935',
      placeholder: isDark ? '#94a3b8' : '#6b7280',
      iconColor: isDark ? '#fff' : '#000',
      status: isDark ? '#1e3a8a' : '#dbeafe',
      muted: isDark ? '#475569' : '#94a3b8',
    },
  };
}