import React from "react";

class AccountPage extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            address: '',
            error: null,
            isLoaded: false,
            metadata: []
        };
    }

    componentDidMount(){
        
    }
}

export default AccountPage;
