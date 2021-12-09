import React from 'react'
import {
    Form,
    Button,
    Grid,
    Segment,
    Message,
    Icon,
    Header
} from 'semantic-ui-react'

const LoginUI = ({
    form: { form, onSubmit, loginFormValid, loading, onChange, error }
}) => {
    return (
        <div className="c-container">
            <Header as='h2' inverted style={{display: 'flex', justifyContent: 'center'}}>
                <Icon name='copy' />
                <Header.Content style={{textAlign: 'left'}}>
                    Login
                <Header.Subheader>Sign in to your account</Header.Subheader>
                </Header.Content>
            </Header>
            <Grid centered>
                <Grid.Column style={{maxWidth: 550, marginTop: 20}}>

                    <Segment>
                        <Form>
                        { error && <Message negative content={error?.detail} />}
                            <Form.Field>
                                <Form.Input
                                    autoFocus
                                    value={form.username || ""}
                                    onChange={onChange}
                                    name="username"
                                    placeholder="Username"
                                    label="Username"
                                />
                            </Form.Field>

                            <Form.Field>
                                <Form.Input
                                    value={form.password || ""}
                                    onChange={onChange}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    label="Password"
                                />
                            </Form.Field>
                            
                            <Button
                                onClick={onSubmit}
                                disabled={loginFormValid || loading}
                                fluid
                                loading={loading}
                                primary
                                type="submit"
                            >
                                Submit
                            </Button>

                        </Form>
                    </Segment>

                </Grid.Column>
            </Grid>
        </div>
    )
}

export default LoginUI