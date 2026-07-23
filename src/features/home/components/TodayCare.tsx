import type { ComponentType } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { SvgProps } from 'react-native-svg';

import TaskCheckComplete from '../../../../assets/figma/home/task-check-complete.svg';
import TaskCheckOutline from '../../../../assets/figma/home/task-check-outline.svg';
import TaskMore from '../../../../assets/figma/home/task-more.svg';
import TaskPaw from '../../../../assets/figma/home/task-paw.svg';
import TaskVet from '../../../../assets/figma/home/task-vet.svg';
import TaskWalk from '../../../../assets/figma/home/task-walk.svg';
import { en } from '@/i18n/en';
import { homeTokens } from '@/theme/homeTokens';

type TodayCareProps = {
  onMedication: () => void;
  onVet: () => void;
  onWalk: () => void;
};

export function TodayCare({
  onMedication,
  onVet,
  onWalk,
}: TodayCareProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.heading}>{en.home.care.heading}</Text>
        <Text style={styles.date}>{en.home.care.date}</Text>
      </View>
      <View style={styles.tasks}>
        <CareTask
          accessibilityLabel={en.home.accessibility.walk}
          detail={en.home.care.walkDetail}
          icon={TaskWalk}
          iconBackground={homeTokens.color.softNeutral}
          iconHeight={21.5}
          iconWidth={13}
          onPress={onWalk}
          title={en.home.care.walkTitle}
          trailing={TaskCheckOutline}
        />
        <CareTask
          accessibilityLabel={en.home.accessibility.medication}
          completed
          detail={en.home.care.medicationDetail}
          icon={TaskPaw}
          iconBackground={homeTokens.color.softGreen}
          iconHeight={19}
          iconWidth={20}
          onPress={onMedication}
          title={en.home.care.medicationTitle}
          trailing={TaskCheckComplete}
        />
        <CareTask
          accessibilityLabel={en.home.accessibility.vet}
          detail={en.home.care.vetDetail}
          icon={TaskVet}
          iconBackground={homeTokens.color.softPrimary}
          iconHeight={20.5}
          iconWidth={19}
          onPress={onVet}
          title={en.home.care.vetTitle}
          trailing={TaskMore}
        />
      </View>
    </View>
  );
}

type CareTaskProps = {
  accessibilityLabel: string;
  completed?: boolean;
  detail: string;
  icon: ComponentType<SvgProps>;
  iconBackground: string;
  iconHeight: number;
  iconWidth: number;
  onPress: () => void;
  title: string;
  trailing: ComponentType<SvgProps>;
};

function CareTask({
  accessibilityLabel,
  completed,
  detail,
  icon: Icon,
  iconBackground,
  iconHeight,
  iconWidth,
  onPress,
  title,
  trailing: Trailing,
}: CareTaskProps) {
  return (
    <View style={[styles.task, completed && styles.completedTask]}>
      <View style={styles.taskIdentity}>
        <View style={[styles.taskIcon, { backgroundColor: iconBackground }]}>
          <Icon height={iconHeight} width={iconWidth} />
        </View>
        <View style={styles.taskCopy}>
          <Text
            numberOfLines={1}
            style={[styles.taskTitle, completed && styles.completedTitle]}
          >
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.taskDetail}>
            {detail}
          </Text>
        </View>
      </View>
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.taskAction,
          completed ? styles.completedAction : styles.pendingAction,
          pressed && styles.pressed,
        ]}
      >
        <Trailing
          height={
            completed
              ? 9.019
              : title === en.home.care.vetTitle
                ? 3
                : 9.019
          }
          width={title === en.home.care.vetTitle ? 12 : 12.225}
        />
      </Pressable>
    </View>
  );
}

const taskShadow = Platform.select({
  web: {
    boxShadow: '0 4px 6px rgba(217,119,87,0.08)',
  },
  default: {
    shadowColor: '#d97757',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
});

const styles = StyleSheet.create({
  section: {
    width: '100%',
    height: 288,
    gap: 16,
  },
  header: {
    width: '100%',
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    color: homeTokens.color.deepPrimary,
    fontFamily: homeTokens.font.quicksandSemiBold,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  date: {
    color: homeTokens.color.body,
    fontFamily: homeTokens.font.jakartaMedium,
    fontSize: 12,
    lineHeight: 16,
  },
  tasks: {
    width: '100%',
    height: 240,
  },
  task: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: homeTokens.color.white,
    ...taskShadow,
  },
  completedTask: {
    opacity: 0.6,
  },
  taskIdentity: {
    minWidth: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  taskIcon: {
    width: 48,
    height: 48,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  taskCopy: {
    minWidth: 0,
    flex: 1,
  },
  taskTitle: {
    color: homeTokens.color.neutralText,
    fontFamily: homeTokens.font.jakartaRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
  },
  taskDetail: {
    color: homeTokens.color.body,
    fontFamily: homeTokens.font.jakartaMedium,
    fontSize: 12,
    lineHeight: 16,
  },
  taskAction: {
    width: 32,
    height: 32,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  pendingAction: {
    borderWidth: 2,
    borderColor: 'rgba(153,70,42,0.2)',
  },
  completedAction: {
    backgroundColor: homeTokens.color.deepPrimary,
  },
  pressed: {
    opacity: 0.65,
  },
});
