export type Version = {
    /**
     * The version of the standard used. If the signer does not support the version of the request,
     * it must send the "VERSION_NOT_SUPPORTED" error in response.
     */
    version: string
}