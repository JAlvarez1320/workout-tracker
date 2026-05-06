import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type CollapsibleProps = PropsWithChildren & {
  title: string;
  subtitle?: string;
  time?: string;
  pr?: string;
};

export function Collapsible({ children, title, subtitle, time, pr }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <View style={styles.leftSide}>
          <IconSymbol
            name="chevron.right"
            size={18}
            weight="medium"
            color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
            style={[
              styles.chevron,
              { transform: [{ rotate: isOpen ? '90deg' : '0deg' }] },
            ]}
          />

          <View style={styles.textArea}>
            <ThemedText type="defaultSemiBold" style={styles.titleText}>
              {title}
            </ThemedText>

            {subtitle && (
              <ThemedText style={styles.subtitleText}>
                {subtitle}
              </ThemedText>
            )}

            {(time || pr) && (
              <View style={styles.metaContainer}>
                {time && (
                  <ThemedText style={styles.metaText}>
                    Time: {time}
                  </ThemedText>
                )}

                {pr && (
                  <ThemedText style={styles.metaText}>
                    PR: {pr}
                  </ThemedText>
                )}
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  heading: {
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  chevron: {
    marginRight: 10,
    marginTop: 4,
  },
  textArea: {
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  subtitleText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  metaContainer: {
    marginTop: 8,
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#4B5563',
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 4,
    marginLeft: 32,
  },
});