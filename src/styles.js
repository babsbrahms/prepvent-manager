import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0E0C20",
        padding: 8,
        width: '100%',
        height: '100%',
        // flex: 1
    },
    row: {
        display: "flex",
        flexDirection: "row",
        width: '100%',
    },
    between: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
    },
    around: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: '100%',
    },
    Header: {
        fontSize: 40,
        color: "#FFFFFF",
        fontWeight: "bold"
    },
    icon: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    search: {
        backgroundColor: "#FFFFFF", 
        color: "#0E0C20", 
        fontSize: 18, 
        borderRadius: 20, 
        marginBottom: 9,
        padding: 3,
        flex: 1
    },
    image: {
        width: '100%',
        backgroundColor: "#707070",
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        flex: 1,
        minHeight: 250,
        backgroundColor: "#0E0C20",
    },
    segment: {
        borderRadius: 20,
        marginTop: 0,
        marginBottom: 9,
        width: '100%',
        minHeight: 100,
        backgroundColor: '#FFFFFF',
        padding: 5,
    },
    hairLine: {
        width: '100%', 
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#707070'
    },
    title: {
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 25
    },
    optionTitle: {
        color: '#000000',
        fontWeight: "bold",
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 3
    },
    optionBody: {
        borderBottomColor: '#707070',
        padding: 4,
        marginHorizontal: 3,
        borderBottomWidth: 2,
        width: '100%'
    },
    optionText: {
        color: '#707070',
        fontSize: 24,
        // fontWeight: "bold",
        textAlign: 'center',
    },
    optionSubTitle: {
        color: '#707070',
        fontSize: 18,
        // fontWeight: "bold",
        textAlign: 'center',
    },
    details: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1
    },
    detailsInput: {
        backgroundColor: "#707070", 
        color: "#FFFFFF", 
        fontSize: 18, 
        borderRadius: 20, 
        marginBottom: 9,
        flex: 1
    },
    detailsRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between", 
        // paddingTop: 4
    },
    error: {
        color: '#EC3636',
        fontSize: 16
    },
    textInput: {
        backgroundColor: "#707070", 
        color: "#FFFFFF", 
        fontSize: 18, 
        borderRadius: 20, 
        marginBottom: 9,
        width: '100%',
        // padding: 15
    },
    inputLabel: {
        position: 'relative',
        alignSelf: 'flex-start',
        top: 10,
        left: 12,
        backgroundColor: '#FFFFFF',
        padding: 2,
        zIndex: 5,
        color: "#707070",
        borderRadius: 2
    },
});

export default styles;