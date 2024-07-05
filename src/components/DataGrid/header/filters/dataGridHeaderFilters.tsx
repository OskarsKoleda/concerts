import { ToggleButton, ToggleButtonGroup } from "@mui/material"

export const DataGridHeaderFilters = () =>{

    return (

        <ToggleButtonGroup>
            <ToggleButton value="concerts">Concerts</ToggleButton>
            <ToggleButton value="festivals">Festivals</ToggleButton>
        </ToggleButtonGroup>
    )
}