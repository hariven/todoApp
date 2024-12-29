"use client";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button"; // Corrected the path to Button component

type Habit = {
  id: number;
  title: string;
  frequency: string;
  streak: number;
  preferredTime: "morning" | "afternoon" | "evening";
};

const initialHabits: Habit[] = [];

function TodoApp() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [newHabit, setNewHabit] = useState<Habit>({
    id: Date.now(),
    title: "",
    frequency: "",
    streak: 0,
    preferredTime: "morning",
  });
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const addHabit = () => {
    if (newHabit.title && newHabit.frequency) {
      setHabits([...habits, { ...newHabit, id: Date.now() }]);
      setNewHabit({ id: 0, title: "", frequency: "", streak: 0, preferredTime: "morning" });
    }
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const startEditing = (id: number) => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
      setIsEditing(id);
      setNewHabit(habit);
    }
  };

  const saveEdit = () => {
    setHabits(habits.map(habit => (habit.id === isEditing ? newHabit : habit)));
    setIsEditing(null);
    setNewHabit({ id: 0, title: "", frequency: "", streak: 0, preferredTime: "morning" });
  };

  return (
    <div className="p-4 pt-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Habits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Habit List */}
            {habits.map(habit => (
              <div
                key={habit.id}
                className="flex items-center justify-between p-2 bg-white rounded-lg border"
              >
                <div>
                  <div className="font-medium">{habit.title}</div>
                  <div className="text-sm text-gray-500">
                    {habit.frequency} • {habit.preferredTime}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => startEditing(habit.id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteHabit(habit.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}

            {/* Add / Edit Form */}
            <div className="space-y-2 mt-4">
              <input
                type="text"
                placeholder="Habit Title"
                className="w-full border rounded p-2"
                value={newHabit.title}
                onChange={e => setNewHabit({ ...newHabit, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Frequency (e.g., daily)"
                className="w-full border rounded p-2"
                value={newHabit.frequency}
                onChange={e => setNewHabit({ ...newHabit, frequency: e.target.value })}
              />
              <select
                className="w-full border rounded p-2"
                value={newHabit.preferredTime}
                onChange={e => setNewHabit({ ...newHabit, preferredTime: e.target.value as Habit["preferredTime"] })}
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
              {isEditing ? (
                <Button onClick={saveEdit}>Save Changes</Button>
              ) : (
                <Button onClick={addHabit}>Add Habit</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TodoApp;
