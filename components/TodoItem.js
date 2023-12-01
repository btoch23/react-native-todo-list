import { useState } from "react";
import { List, Checkbox, IconButton } from "react-native-paper";
import { View } from "react-native";

const TodoItem = ({ todo, remove, toggle }) => {
    const [checked, setChecked] = useState(false);

    const removeTodo = () => {
        remove(todo.id);
    };

    const toggleTodo = () => {
        toggle(todo.id);
        setChecked(!checked);
    }

    return (
        <List.Item
            title={todo.text}
            right={props => 
                <IconButton {...props} 
                    icon="delete-outline" 
                    onPress={removeTodo} 
                    iconColor='#eb5e28'
                />}
            left={props => 
                <Checkbox {...props} 
                    status={todo.completed ? 'checked' : 'unchecked'} 
                    onPress={toggleTodo}
                    color="#eb5e28"
                    uncheckedColor="#eb5e28"
                />}
        />
    )
}

export default TodoItem;