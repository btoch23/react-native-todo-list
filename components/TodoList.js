import { ScrollView,StyleSheet, View } from "react-native";
import { Text, ToggleButton, Divider, SegmentedButtons } from "react-native-paper";
import { useState } from "react";
import TodoItem from './TodoItem';
import TodoForm from './TodoForm'
import uuid from 'react-native-uuid';

const initialTodos = [];

const FILTER_MAP = {
    All: () => true,
    Active: (todo) => !todo.completed,
    Completed: (todo) => todo.completed
}

const TodoList = () => {
    const [todos, setTodos] = useState(initialTodos);
    const [filter, setFilter] = useState('All');
    const [value, setValue] = useState('All');

    const removeTodo = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((t) => t.id !== id)
        });
    };

    const addTodo = (text) => {
        setTodos(prevTodos => {
            return [...prevTodos, {
                text: text,
                id: uuid.v4(),
                completed: false
            }]
        });
    };

    const toggleTodo = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {...todo, completed: !todo.completed}
                } else {
                    return todo;
                }
            });
        });
    };

    const taskList = todos
        .filter(FILTER_MAP[filter])
        .map((todo) => (
            <>
                <TodoItem 
                todo={todo}
                key={todo.id}
                remove={removeTodo}
                toggle={toggleTodo}
                />
                <Divider horizontalInset={true} key={uuid.v4()} />
            </>
        ))

    return (
        <View style={{marginTop: 40, height: '93%'}}>
            <Text variant="headlineSmall" style={styles.heading}>
                what's on the docket for today?
            </Text>
            <TodoForm addTodo={addTodo} />
            {todos.length !== 0 
                ?   <ScrollView style={{paddingLeft: 18}}>{taskList}</ScrollView>  
                :   <ScrollView style={{paddingTop: 50}}>
                        <Text variant="titleLarge" style={{textAlign: 'center'}}>your list is empty</Text>
                    </ScrollView>
            }
            <Divider horizontalInset={true} />
            <View style={styles.bottomBtns}>
                <SegmentedButtons 
                    value={filter}
                    onValueChange={setFilter}
                    theme={{ 
                        colors: { 
                            secondaryContainer: '#f7b9a1' 
                        }
                    }}
                    buttons={[
                        {
                            value: 'All',
                            label: 'All',
                        },
                        {
                            value: 'Active',
                            label: 'Active',
                        },
                        {
                            value: 'Completed',
                            label: 'Completed',
                        },
                    ]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        marginBottom: 10,
        paddingTop: 30,
        paddingBottom: 30,
        paddingHorizontal: 35,
        backgroundColor: '#eb5e28',
        color: 'white'
    },
    bottomBtns: {
        justifyContent: 'center', 
        paddingTop: 20, 
        paddingBottom: 10,
        paddingHorizontal: 15
    }
})

export default TodoList;