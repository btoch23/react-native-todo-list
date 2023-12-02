import { ScrollView,StyleSheet, View } from "react-native";
import { Text, ToggleButton, Divider } from "react-native-paper";
import { useState } from "react";
import TodoItem from './TodoItem';
import FilterBtn from './FilterBtn';
import TodoForm from './TodoForm'
import uuid from 'react-native-uuid';

const initialTodos = [];

const FILTER_MAP = {
    All: () => true,
    Active: (todo) => !todo.completed,
    Completed: (todo) => todo.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

const TodoList = () => {
    const [todos, setTodos] = useState(initialTodos);
    const [filter, setFilter] = useState('All');
    const [value, setValue] = useState('All')

    const filterList = FILTER_NAMES.map((name) => (
        <FilterBtn 
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ))

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
            <TodoItem 
                todo={todo}
                key={todo.id}
                remove={removeTodo}
                toggle={toggleTodo}
            />
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
                <ToggleButton.Row 
                    value={value} 
                    onValueChange={value => setValue(value)}
                    style={{justifyContent: 'space-between'}}
                >
                    {filterList}
                </ToggleButton.Row>
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
        alignSelf: 'center',
        flexDirection: 'row', 
        justifyContent: 'center', 
        paddingTop: 20, 
        paddingBottom: 10,
        // borderTopColor: 'gray',
        // borderTopWidth: 1,
        // width: '93%'
    }
})

export default TodoList;