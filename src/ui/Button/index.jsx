import { styled } from '@stitches/react';


const Button = styled('button', {
    paddingBlock: "9px",
    maxHeight: "50px",
    borderRadius: "36px",
    fontWeight: "normal",
    fontSize: "18px",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    variants: {
        variant: {
            green: {
                backgroundColor: "#0FA958",
                color: "white",
            },
            white: {

                backgroundColor: "#d9d9d9",
                color: "black",
                border: "1px solid grey",

            }
        },
        size: {
            medium: {
                width: "300px",
                maxWidth: "100%"
            },
            small: {
                maxWidth: "300px",
                width:"100%",
                minWidth:"200px",
                paddingBlock:"7px",
            },
        },
        type: {

        },

    },

    defaultVariants: {
        size: "medium",
        variant: "green",
        color: "white",
    }
})

export default Button;