import React, { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ShortModal from 'react-native-modal';
import styles from '../styles';


const style = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        marginHorizontal: 15,
    },
    scrollableModal: {
        height: 300,
        backgroundColor: "#FFFFFF",
        padding: 3,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    }
});


    

const Option = ({openModal, closeModal, children, title, subtitle}) => {
    const scrollViewRef = useRef(null);

    const [scrollOffset, setScrollOffset] = useState(null);
    

    const handleOnScroll = event => {  
        setScrollOffset(event.nativeEvent.contentOffset.y)   
    };

    const handleScrollTo = p => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo(p);
        }
    };

    return (           
        <ShortModal
            testID={'modal'}
            isVisible={openModal}
            backdropColor={"#0E0C20"}
            onBackdropPress={() => closeModal()}
            onSwipeComplete={() => closeModal()}
            swipeDirection={['down']}
            scrollTo={handleScrollTo}
            scrollOffset={scrollOffset}
            scrollOffsetMax={400 - 300} // content height - ScrollView height
            propagateSwipe={true}
            style={style.modal}>
                <View style={style.scrollableModal}>
                    <Text style={styles.optionTitle}>{title}</Text>
                    {!!subtitle && <Text style={styles.optionSubTitle}>{subtitle}</Text>}
                    <ScrollView
                        ref={scrollViewRef}
                        onScroll={handleOnScroll}
                        scrollEventThrottle={16}
                    >
                        {children}
                    </ScrollView>
                </View>
        </ShortModal>
    )
}

export default Option;