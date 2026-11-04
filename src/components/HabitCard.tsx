import AppText from "@/components/ui/AppText";
import { radius, spacing } from "@/constants/theme";
import { useAppColors } from "@/hooks/useAppColors";
import { Habit } from "@/types/habit";
import { habitProgress } from "@/utils/progress";
import { Ionicons } from "@expo/vector-icons";
import Swipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { DayGrid } from "./DayGrid";

const DELETE_COLOR = "#B42318";

type HabitCardProps = {
  habit: Habit;
  onToggleDay: (day: number) => void;
  onDelete: () => void;
};

export function HabitCard({ habit, onToggleDay, onDelete }: HabitCardProps) {
  const colors = useAppColors();
  const swipeableRef = useRef<SwipeableMethods>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const closeConfirmation = () => {
    setConfirmingDelete(false);
    swipeableRef.current?.close();
  };

  const renderDeleteAction = () => <DeleteAction />;

  return (
    <>
      <Swipeable
        ref={swipeableRef}
        containerStyle={styles.swipeContainer}
        friction={2}
        leftThreshold={72}
        rightThreshold={72}
        overshootLeft={false}
        overshootRight={false}
        renderLeftActions={renderDeleteAction}
        renderRightActions={renderDeleteAction}
        onSwipeableOpen={() => setConfirmingDelete(true)}
      >
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <View style={styles.headerRow}>
            <View style={styles.titleWrap}>
              <AppText size={20} weight="bold" color={colors.text}>
                {habit.name}
              </AppText>
              <AppText
                size={13}
                color={colors.muted}
                weight="medium"
                style={styles.subTitle}
              >
                {habit.completedDays.length}/{habit.totalDays} Days
              </AppText>
            </View>
          </View>

          <View style={styles.metaRow}>
            <AppText size={14} weight="semibold" color={colors.text}>
              {habitProgress(habit)}% Done
            </AppText>
            <AppText size={13} weight="medium" color={colors.text}>
              {habit.totalDays} Days Focus
            </AppText>
          </View>

          <DayGrid habit={habit} onToggleDay={onToggleDay} />
        </View>
      </Swipeable>

      <Modal
        transparent
        visible={confirmingDelete}
        animationType="fade"
        onRequestClose={closeConfirmation}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.confirmationCard,
              { backgroundColor: colors.surface },
            ]}
          >
            <AppText size={18} weight="bold" style={styles.confirmationTitle}>
              Delete this habit?
            </AppText>
            <AppText
              size={14}
              color={colors.muted}
              style={styles.confirmationMessage}
            >
              “{habit.name}” and its progress will be permanently removed.
            </AppText>
            <View style={styles.confirmationActions}>
              <Pressable
                accessibilityRole="button"
                onPress={closeConfirmation}
                style={[
                  styles.confirmationButton,
                  { backgroundColor: colors.surfaceSecondary },
                ]}
              >
                <AppText size={14} weight="semibold">
                  Cancel
                </AppText>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  setConfirmingDelete(false);
                  onDelete();
                }}
                style={[
                  styles.confirmationButton,
                  { backgroundColor: DELETE_COLOR },
                ]}
              >
                <AppText size={14} weight="semibold" color="#FFFFFF">
                  Delete
                </AppText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

function DeleteAction() {
  return (
    <View style={styles.deleteAction}>
      <Ionicons name="trash-outline" size={21} color="#FFFFFF" />
      <AppText size={12} weight="semibold" color="#FFFFFF">
        Delete
      </AppText>
    </View>
  );
}

export default HabitCard;

const styles = StyleSheet.create({
  swipeContainer: {
    borderRadius: radius.xl,
    overflow: "hidden",
  },
  card: {
    padding: spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleWrap: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  subTitle: {
    marginTop: 4,
  },
  deleteAction: {
    width: 88,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    backgroundColor: DELETE_COLOR,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.xl,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  confirmationCard: {
    borderRadius: radius.xl,
    padding: spacing.lg,
  },
  confirmationTitle: {
    textAlign: "left",
  },
  confirmationMessage: {
    textAlign: "left",
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  confirmationActions: {
    flexDirection: "row",
    gap: spacing.sm,
    width: "100%",
    marginTop: spacing.lg,
  },
  confirmationButton: {
    flex: 1,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 14,
  },
});
