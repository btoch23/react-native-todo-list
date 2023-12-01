import { ToggleButton } from "react-native-paper";

const FilterBtn = (props) => {
    return (
        <ToggleButton 
            onPress={() => props.setFilter(props.name)}
            icon={
                props.name === 'All' 
                    ? 'all-inclusive' 
                    : props.name === 'Active' 
                    ? 'exclamation' 
                    : 'check'}
            value={props.name}
            size={30}
            style={{marginHorizontal: 50}}
            iconColor="#eb5e28"
        />
    )
}

export default FilterBtn;