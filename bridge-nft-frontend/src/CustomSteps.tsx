import React from "react";
import { Icon, Step } from "semantic-ui-react";


class CustomSteps extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            active: this.props.active,
            completed: this.props.completed
        };
    }
    handleClick = (e, { title }) => this.setState({ active: title })
    render() {
        const { active,completed } = this.state
        return (
            <Step.Group widths={3}>
                <Step
                    active={active === 'Upload Art'}
                    completed={completed === 1}
                    icon='truck'
                    link
                    onClick={this.handleClick}
                    title='Upload Art'
                    description='Fill details and upload your art to IPFS'
                />
                <Step
                    active={active === 'Mint NFT'}
                    completed={completed === 2}
                    icon='credit card'
                    link
                    onClick={this.handleClick}
                    title='Mint NFT'
                    description='Mint Uploaded NFT'
                />
                <Step
                    active={active === 'Put For Sale'}
                    completed={completed === 3}
                    icon='credit card'
                    link
                    onClick={this.handleClick}
                    title='Put For Sale'
                    description='Give approvals and put NFT for sale!'
                />
            </Step.Group>
        )
    }
}

export default CustomSteps;