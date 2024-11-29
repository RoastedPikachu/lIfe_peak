import React from 'react';

import TheHeader from "@/widgets/header/TheHeader";

const ContentPageWrapper: React.FC<{children: any}> = ({children}) => {
    return (
        <>
         <TheHeader/>

         {children}
        </>
    );
};

export default ContentPageWrapper;