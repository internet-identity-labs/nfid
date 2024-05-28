#[ic_cdk_macros::update]
fn get_trusted_origins() -> Vec<String> {
    return vec![
        String::from("https://identity-kit.nfid.one"),
        String::from("https://dev.identity-kit.nfid.one"),
        String::from("http://localhost:3001"),
    ];
}
