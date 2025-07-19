///api_version=2
(script = registerScript({
    name: "BungeeLogger",
    authors: ["xWhitey"],
    version: "1.337"
})).import("Core.lib");

module = {
    onPacket: function(e) {
        e.packet instanceof SPacketCustomPayload && print(e.packet.getChannelName()) 
    }
}