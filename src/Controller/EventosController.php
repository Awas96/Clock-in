<?php

namespace App\Controller;

use App\Entity\Evento;
use App\Entity\Turno;
use App\Repository\EventoRepository;
use App\Repository\TurnoRepository;
use App\Repository\UsuarioRepository;
use Datetime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/eventos", name="eventos_")
 */
class EventosController extends AbstractController
{
    /**
     * @Route("/gestion/horarios", name="gestiona_horarios")
     */
    public function base(UsuarioRepository $usuarioRepository): Response
    {
        $usuarios = $usuarioRepository->findAll();
        return $this->render('eventos/base.html.twig', [
            'usuarios' => $usuarios,
            'controller_name' => 'EventosController',
        ]);
    }

    /**
     * @Route("/gestion/horario", name="gestiona_horario_personal")
     */
    public function base_usuario(UsuarioRepository $usuarioRepository): Response
    {
        $usuarios = $usuarioRepository->findByID($this->getUser()->getId());
        dump($usuarios);
        return $this->render('eventos/gestiona_horario.html.twig', [
            'usuarios' => $usuarios,
            'controller_name' => 'EventosController',
        ]);
    }

    /**
     * @Route("/gestion/horarios/leer", name="gestiona_horarios_leer")
     */
    public function recoger(Request $request, EventoRepository $eventoRepository, TurnoRepository $turnoRepository): Response
    {
        //recoger solo los eventos que nos interesan
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            if (!empty($content)) {
                $params = json_decode($content, true);
                $startDate = \DateTime::createFromFormat('d-n-Y', "01-" . ($params["mes"] - 1) . "-" . $params["anno"]);
                $startDate->setTime(0, 0, 0);

                $endDate = \DateTime::createFromFormat('d-n-Y', "01-" . ($params["mes"] + 2) . "-" . $params["anno"]);
                $endDate->setTime(0, 0, 0);
                $enEventos = ($eventoRepository->findByUsIdAndDate($params["idusuario"], $startDate->format("Y-m-d"), $endDate->format("Y-m-d")));
                $eventos = array();
                foreach ($enEventos as $ev) {
                    $enTurnos = ($turnoRepository->findByEvento($ev->getId()));
                    foreach ($enTurnos as $et) {
                        array_push($eventos, ["id_evento" => $ev->getId(), "fecha" => $ev->getFecha()->format("Y-m-d"), "id_turno" => $et->getId(), "start" => $et->getHoraInicio()->format("H:i"), "end" => $et->getHoraFin()->format("H:i"), "title" => "Turno"]);
                    }
                }
            }
            return new JsonResponse($eventos);
        }
        return new Response('Error!', 400);
    }


    /**
     * @Route("/gestion/horarios/agregar", name="gestiona_horarios_agregar")
     */
    public
    function agregar(Request $request, UsuarioRepository $usuarioRepository, TurnoRepository $turnoRepository, EventoRepository $eventoRepository, Evento $evento = null, Turno $turno = null): Response
    {
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            if (!empty($content)) {
                $datos = json_decode($content, true);
                foreach ($datos as $params) {
                    if ($params["tipo"] == "Turno") {
                        $id = $params["id"];
                        $fecha = new Datetime(date('Y-m-d', strtotime($params["fecha"])));
                        $inicio = new Datetime(date('H:i', strtotime($params['inicio'])));
                        $fin = new Datetime(date('H:i', strtotime($params['fin'])));
                        $guardar = $params["accion"];

                        $em = $this->getDoctrine()->getManager();
                        if ($guardar == "true") {
                            $evento = new Evento();
                            $evento->setFecha($fecha);
                            $evento->setUsuario($usuarioRepository->findByID($id));
                            $em->persist($evento);
                            $em->flush();
                            $turno = new Turno();
                            $turno->setHoraInicio($inicio);
                            $turno->setHoraFin($fin);
                            $turno->setEvento($evento);
                            $em->persist($evento);
                            $em->persist($turno);
                            $em->flush();
                        } elseif ($guardar == "edit") {
                            $idEvento = $params["id_evento"];
                            $idTurno = $params["id_turno"];
                            $turno = $turnoRepository->findById($idTurno);
                            $turno->setHoraInicio($inicio);
                            $turno->setHoraFin($fin);
                            $em->persist($turno);
                            $em->flush();
                        } elseif ($guardar == "delete") {
                            $idEvento = $params["id_evento"];
                            $idTurno = $params["id_turno"];
                            $evento = $eventoRepository->findById($idEvento);
                            $turno = $turnoRepository->findById($idTurno);
                            $em->remove($turno);
                            if ($evento->getTurno()->count() <= 0) {
                                $em->remove($evento);
                            }
                            $em->flush();
                        }

                    }
                }

            }

            return new JsonResponse("Datos guardados correctamente!");
        }
        return new Response('Error!', 400);
    }

    /**
     * @Route("/fichar", name="fichar")
     */
    public function fichaje(UsuarioRepository $usuarioRepository): Response
    {
        $usuario = $usuarioRepository->findByID($this->getUser()->getId());
        return $this->render('eventos/fichar.html.twig', [
            'usuario' => $usuario,
            'controller_name' => 'EventosController',
        ]);
    }

}
