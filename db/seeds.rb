Post.destroy_all

posts_data = [
  {
    title:        "Introduction à ViewComponent en Rails",
    description:  "Un guide complet pour créer des composants réutilisables avec ViewComponent dans une application Rails 8.",
    status:       "published",
    published_at: 3.days.ago,
    comments:     [
      { author: "Alice Martin",  content: "Excellent article, très clair et bien structuré !" },
      { author: "Bob Durand",    content: "J'aurais aimé un exemple avec des slots imbriqués." },
      { author: "Claire Petit",  content: "Merci pour les exemples de code, ça aide beaucoup." }
    ]
  },
  {
    title:        "Tailwind CSS v4 — Ce qui change",
    description:  "Découvrez les nouvelles fonctionnalités de Tailwind CSS v4 et comment migrer vos projets existants.",
    status:       "published",
    published_at: 1.week.ago,
    comments:     [
      { author: "David Lemaire", content: "La migration CSS-first est un vrai changement de paradigme." },
      { author: "Emma Roux",     content: "Tu as oublié de parler des container queries !" }
    ]
  },
  {
    title:        "Stimulus.js — Gérer les formulaires dynamiques",
    description:  "Comment utiliser Stimulus pour créer des formulaires avec associations imbriquées sans écrire une ligne de JavaScript compliqué.",
    status:       "draft",
    published_at: nil,
    comments:     [
      { author: "François Bleu", content: "Enfin un article sur les nested forms avec Stimulus !" }
    ]
  },
  {
    title:        "Rails 8 — Brouillon en cours",
    description:  nil,
    status:       "draft",
    published_at: nil,
    comments:     []
  }
]

posts_data.each do |data|
  comments_attrs = data.delete(:comments)
  post = Post.create!(data)
  comments_attrs.each { |c| post.comments.create!(c) }
end

puts "✓ #{Post.count} posts créés avec #{Comment.count} commentaires"
